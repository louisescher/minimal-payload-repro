import { GlobalConfig } from 'payload/types'
import bulkUploadField from '../fields/fields/bulk-upload/config'

const BulkUpload: GlobalConfig = {
  slug: 'bulk-upload',
  label: "Bulk-Upload Test",
  admin: {
    description: 'Uploads multiple files to the media collection. Not meant to save them itself. Meant to be a quicker way to upload files.'
  },
  access: {
    read: () => true,
  },
  fields: [
    bulkUploadField,
  ],
}

export default BulkUpload