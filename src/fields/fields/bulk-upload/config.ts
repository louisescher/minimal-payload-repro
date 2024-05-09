// Field config
import { Field } from 'payload/types';
import InputField from './InputField';
import Cell from './Cell';
import payload from 'payload';
import APIError from 'payload/dist/errors/APIError';

// From https://stackoverflow.com/a/38935990
function dataURLtoFile(dataurl: string, filename: string) {
  var arr = dataurl.split(','),
    mime = arr[0].match(/:(.*?);/)[1],
    bstr = atob(arr[arr.length - 1]), 
    n = bstr.length, 
    u8arr = new Uint8Array(n);

  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }

  return new File([u8arr], filename, {type:mime});
}

const bulkUploadField: Field = {
  name: 'bulk_upload',
  label: "Dateien",
  type: 'upload',
  relationTo: 'media',
  required: false,
  hooks: {
    beforeChange: [async ({ data }) => {
      const fileInfo = data.bulk_upload as {filename: string, dataURL: string}[];

      for (const item of fileInfo) {
        let file = dataURLtoFile(item.dataURL, item.filename);

        await payload.create({
          collection: 'media',
          data: {},
          file: {
            data: Buffer.from(item.dataURL.split(",")[1], 'base64'),
            mimetype: file.type,
            name: file.name,
            size: file.size,
          }
        });
      }

      // Always reset the input
      data = null;
      return data;
    }]
  },
  admin: {
    components: {
      Field: InputField,
      Cell,
    }
  }
};

export default bulkUploadField;