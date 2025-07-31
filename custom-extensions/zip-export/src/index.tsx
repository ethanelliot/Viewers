import { id } from './id';
import JSZip from 'jszip';

export default {
  id,
  getCommandsModule: ({ servicesManager, commandsManager, extensionManager }) => {
    return {
      definitions: {
        ZipExport: {
          commandFn: async () => {
            const { ViewportGridService, DisplaySetService } = servicesManager.services;

            // Get the active viewport ID and viewports from the ViewportGridService
            const { activeViewportId, viewports } = ViewportGridService.getState();

            // from viewports get the displaySet of the active viewport
            let displaySetInstanceUID = viewports?.get(activeViewportId)?.displaySetInstanceUIDs[0];
            const displaySet = DisplaySetService.getDisplaySetByUID(displaySetInstanceUID);

            // get the displayset instance
            const instance = displaySet?.instances?.[0] || displaySet?.instance;

            const viewportElement = document.querySelector(
              `[data-viewport-uid="${activeViewportId}"]`
            );

            if (!viewportElement) {
              console.log('Viewport element not found');
              return;
            }
            const canvas = viewportElement.querySelector('canvas');

            if (!canvas) {
              console.log('Canvas not found');
              return;
            }

            // new zip file
            const zip = new JSZip();

            //construct metadata
            const metadata = {
              patientName: instance?.PatientName[0]?.Alphabetic,
              studyDate: instance?.StudyDate,
            };

            // Put metadata into zip
            zip.file('metadata.json', JSON.stringify(metadata));

            // Put png of image into zip
            try {
              const blob = await new Promise<Blob>((resolve, reject) => {
                canvas.toBlob(blob => {
                  if (blob) {
                    resolve(blob);
                  } else reject(new Error('Canvas toblob failed'));
                }, 'image.png');
              });

              const fileName = 'image.png';
              zip.file(fileName, blob);

              // download zip
              zip.generateAsync({ type: 'blob' }).then((content: Blob) => {
                const link = document.createElement('a');
                link.href = window.URL.createObjectURL(content);
                link.download = `${metadata.patientName}.zip`;
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
              });
            } catch (err) {
              console.error(err);
            }
          },
        },
      },
      defaultContext: 'ACTIVE_VIEWPORT',
    };
  },
};
