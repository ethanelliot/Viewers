# Custom Zip Extention + Mode

Name: Ethan Elliot

---
## Requirements

- [Yarn 1.20.0+](https://yarnpkg.com/en/docs/install)
- [Node 18+](https://nodejs.org/en/)
- Yarn Workspaces should be enabled on your machine:
  - `yarn config set workspaces-experimental true`

---
## To Develop

_From this repository's root directory:_


```bash
git clone https://github.com/ethanelliot/Viewers
cd Viewers

# Enable Yarn Workspaces
yarn config set workspaces-experimental true

# Restore dependencies
yarn install

# run dev
yarn run dev
```

## Zip Extention + Mode
To access the extension, you will need to use the custom mode. This is labeled as "Zip Mode" and can be seen inline with the other modes after clicking on a study.
After entering the mode you will notice a dowload button in the main toolbar(left of "Reset View"). Click this to use the extetntion and download the current image and its key metadata as a .zip file.


## development process
I worked through the steps provided in the document. I took each step one at a time, first adding an extension and mode, then adding a button to the main toolbar that simply printed out a message to the terminal. I then worked on getting the metadata and image data. I spent a lot of time playing with the Services provided from `servicesManager.services` to figure out what things were doing before I was able to lay down a concrete solution. I also spent a lot of time on Google to try to figure out how everything connected together.

##  challenges encountered

I did get stuck for a while trying to figure out how to create extensions and modes. I was able to quickly Google to find a solution, however, and ended up using the CLI.
I spent most of my time trying to find how to get user metadata and the image. This proved challenging for me, and I found the documentation to be somewhat unhelpful. Googling also provided little help, as there were no good resources. One thing I found very helpful was reviewing existing code. For example, I used the `usePatientInfo` hook to find that patient data was stored in an instance that I could get from a display set. After I found that, I was able to use the documentation more effectively and get the ball rolling.


##  assumptions and future features

I did encounter a bug where on my machine (Mac), when opening the download file from the browser, I would get an error from "unsupported format" some of the time, some images were fine, some weren't. This was strange and happened too late for me to fix, so I would like to look into this more.

I would like to add some more metadata fields for things like patient ID and export date. Maybe some date formatting as well, but that stuff is easy enough from what i've got so far.

I also am not 100% sure about how I implemented image export. Maybe there's a way to do it in Cornerstone, but my assumption was that it would export it as a raw DICOM or just pixel data file, not JPEG/PNG as asked for, so I would like to revisit that. I know that I can use `@cornerstonejs/core` and `cornerstone.imageLoader.loadImage(instance?.imageId);` to get raw pixel data. But I was unsure how to convert this back to a PNG/JPEG format. I could have left it raw, but I thought my final solution was better.
