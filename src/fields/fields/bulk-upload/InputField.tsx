// Input itself
import React, { useCallback, Fragment, useRef } from 'react'

// this is how we'll interface with Payload itself
import { useFieldType } from 'payload/components/forms';

// we'll re-use the built in Label component directly from Payload
import { Label } from 'payload/components/forms';

import Error from 'payload/dist/admin/components/forms/Error/index';

// we can use existing Payload types easily
import { Props } from 'payload/components/fields/Text';

// Import the SCSS stylesheet
import './styles.scss';

const baseClass = 'bulk-upload';

const InputField: React.FC<Props> = (props) => {
  const {
    path,
    label,
    required,
    validate,
  } = props;

  const {
    value = [],
    setValue,
    errorMessage,
    showError,
  } = useFieldType<any>({
    path,
    validate,
  });
  const classes = ["field-type", "text", baseClass, showError && "error"].filter(Boolean).join(" ");

  const inputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = useCallback((files: FileList) => {
    let fileArray = [];
    let promises = [];

    for (var i = 0; i < files.length; i++) {
      let reader = new FileReader();

      let filename = files[i].name;

      let promise = new Promise<void>((resolve, reject) => {
        reader.addEventListener('load', () => {
          fileArray.push({ filename: filename, dataURL: reader.result });
          resolve();
        });

        reader.addEventListener('error', reject);

        
        reader.readAsDataURL(files[i]);
      });

      promises.push(promise);
    }
    
    Promise.all(promises).then(() => {
      setValue(fileArray);
    });
  }, [setValue]);

  return (
    <div className={classes}>
      <Label
        htmlFor={path}
        label={label}
        required={required}
      />
      <Error showError={showError} message={errorMessage} />
      <Fragment>
        <input 
          type="file" 
          multiple
          ref={inputRef}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => { 
            handleFileUpload(e.target.files)
          }}
        />
      </Fragment>
    </div>
  )
};
export default InputField;