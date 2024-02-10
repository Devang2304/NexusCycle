import * as React from 'react';
import { FormControl, useFormControlContext } from '@mui/base/FormControl';
import { Input, inputClasses } from '@mui/base/Input';
import { styled } from '@mui/system';
import clsx from 'clsx';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import NativeSelect from '@mui/material/NativeSelect';
import Button from '@mui/material/Button';

export default function ProjectDetails() {
    const [features, setFeatures] = React.useState([]);
  
    const handleAddFeature = () => {
      const newFeature = { value: '', id: features.length };
      setFeatures([...features, newFeature]);
    };
  
    const handleDeleteFeature = (id) => {
      const updatedFeatures = features.filter((feature) => feature.id !== id);
      setFeatures(updatedFeatures);
    };
  
    const handleFeatureChange = (id, value) => {
      const updatedFeatures = features.map((feature) =>
        feature.id === id ? { ...feature, value } : feature
      );
      setFeatures(updatedFeatures);
    };
  
    const handleSubmit = () => {
      // Add your logic here for handling the form submission
      console.log("Form submitted:", { features });
    };
  
    return (
      <>
        <div className="flex justify-center">
          <div className="w-full max-w-2xl">
            <div className="mb-4">
              <label className=" text-sm font-medium text-gray-700">Project Name</label>
              <StyledInput
                className="mt-1 p-2 rounded-md w-full focus:outline-none focus:ring focus:border-blue-500"
                sx={{ width: '100%' }}
                placeholder="Write your name here"
              />
            </div>
  
            <div className="min-w-400">
              <FormControl fullWidth>
                <label className="block text-sm font-medium text-gray-700">Select Company</label>
                <NativeSelect
                  className="mt-1 p-2 rounded-md border border-gray-300 focus:outline-none focus:ring focus:border-blue-500"
                  defaultValue={'Barclays'}
                  inputProps={{
                    name: 'age',
                    id: 'uncontrolled-native',
                  }}
                >
                  <option value={'Barclays'}>Barclays</option>
                  <option value={'Oracle'}>Oracle</option>
                  <option value={'WorkIndia'}>WorkIndia</option>
                </NativeSelect>
              </FormControl>
            </div>
  
            <FormControl fullWidth>
              <label className="block text-sm font-medium text-gray-700">Features</label>
              {features.map((feature, index) => (
                <div key={feature.id} className="feature-row mb-4 fullWidth">
                  <StyledInput
                    value={feature.value}
                    placeholder="Write feature here"
                    onChange={(e) => handleFeatureChange(feature.id, e.target.value)}
                    className="mt-1 p-2 rounded-md w-full border-gray-300 focus:outline-none focus:ring focus:border-blue-500"
                  />
                  <Button
                    variant="outlined"
                    color="error"
                    onClick={() => handleDeleteFeature(feature.id)}
                    className="mt-2"
                  >
                    Delete
                  </Button>
                </div>
              ))}
              <Button
                variant="contained"
                onClick={handleAddFeature}
                className="mt-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              >
                Add Feature
              </Button>
            </FormControl>
  
            <Button
              variant="contained"
              color="primary"
              onClick={handleSubmit}
              className="mt-4 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
            >
              Submit
            </Button>
          </div>
        </div>
      </>
    );
  }
  

const StyledInput = styled(Input)(
  ({ theme }) => `

  .${inputClasses.input} {
    width: 320px;
    font-family: 'IBM Plex Sans', sans-serif;
    font-size: 0.875rem;
    font-weight: 400;
    line-height: 1.5;
    padding: 8px 12px;
    border-radius: 8px;
    color: ${theme.palette.mode === 'dark' ? grey[300] : grey[900]};
    background: ${theme.palette.mode === 'dark' ? grey[900] : '#fff'};
    border: 1px solid ${theme.palette.mode === 'dark' ? grey[700] : grey[200]};
    box-shadow: 0px 2px 2px ${theme.palette.mode === 'dark' ? grey[900] : grey[50]};

    &:hover {
      border-color: ${blue[400]};
    }

    &:focus {
      outline: 0;
      border-color: ${blue[400]};
      box-shadow: 0 0 0 3px ${theme.palette.mode === 'dark' ? blue[600] : blue[200]};
    }
  }
`,
);

const Label = styled(({ children, className }) => {
  const formControlContext = useFormControlContext();
  const [dirty, setDirty] = React.useState(false);

  React.useEffect(() => {
    if (formControlContext?.filled) {
      setDirty(true);
    }
  }, [formControlContext]);

  if (formControlContext === undefined) {
    return <p>{children}</p>;
  }

  const { error, required, filled } = formControlContext;
  const showRequiredError = dirty && required && !filled;

  return (
    <p className={clsx(className, error || showRequiredError ? 'invalid' : '')}>
      {children}
      {required ? ' *' : ''}
    </p>
  );
})`
  font-family: 'IBM Plex Sans', sans-serif;
  font-size: 0.875rem;
  margin-bottom: 4px;

  &.invalid {
    color: red;
  }
`;

const HelperText = styled((props) => {
  const formControlContext = useFormControlContext();
  const [dirty, setDirty] = React.useState(false);

  React.useEffect(() => {
    if (formControlContext?.filled) {
      setDirty(true);
    }
  }, [formControlContext]);

  if (formControlContext === undefined) {
    return null;
  }

  const { required, filled } = formControlContext;
  const showRequiredError = dirty && required && !filled;

  return showRequiredError ? <p {...props}>This field is required.</p> : null;
})`
  font-family: 'IBM Plex Sans', sans-serif;
  font-size: 0.875rem;
`;

const blue = {
  100: '#DAECFF',
  200: '#b6daff',
  400: '#3399FF',
  500: '#007FFF',
  600: '#0072E5',
  900: '#003A75',
};

const grey = {
  50: '#F3F6F9',
  100: '#E5EAF2',
  200: '#DAE2ED',
  300: '#C7D0DD',
  400: '#B0B8C4',
  500: '#9DA8B7',
  600: '#6B7A90',
  700: '#434D5B',
  800: '#303740',
  900: '#1C2025',
};



