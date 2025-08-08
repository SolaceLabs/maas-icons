# maas-icons

> Solace Icons library

[![NPM](https://img.shields.io/npm/v/maas-icons.svg)](https://www.npmjs.com/package/maas-icons) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Overview

The `@solace-labs/maas-icons` library provides a collection of SVG icons that are wrapped in Material UI's `SvgIcon` component. The icons are organized by size (16px, 24px, 32px, 40px) and are available as React components.

## Install

```bash
npm install --save @solace-labs/maas-icons
```

## Basic Usage

### Importing and Using Icons

Icons are named based on their filename and size. For example, `arrowLeft.svg` in the `24px` directory becomes `ArrowLeft24Icon`.

```tsx
import { ReactElement } from "react";
import { ArrowLeft24Icon, Bug16Icon } from "@solace-labs/maas-icons";

const App = (): ReactElement => {
  return (
    <>
      <ArrowLeft24Icon />
      <Bug16Icon />
      <OtherComponents />
    </>
  );
};
```

### Using Illustrations

To import an illustration using ReactJS (assuming you have proper SVG support with babel/webpack):

```tsx
import { SolaceIcon } from "@solace-labs/maas-react-components";
import { ReactComponent as Designer } from "@solace-labs/maas-icons/dist/illustrations/designer.svg";

const Demo = (): ReactElement => {
  return (
    <div>
      <Designer />
    </div>
  );
};
```

## Theming and Styling Icons

The icons in this library are wrapped in MUI's `SvgIcon` component, which provides several ways to customize their appearance.

### 1. Using MUI's Color Properties

The icons inherit color from their parent by default, but you can explicitly set colors using MUI's color properties:

```tsx
<ArrowLeft24Icon color="primary" />
<Bug16Icon color="secondary" />
<CheckFilled16Icon color="success" />
<ErrorCircle16Icon color="error" />
<ContentSearch24Icon color="warning" />
<Terminal16Icon color="info" />
<Broker16Icon color="action" />
<Construction24Icon color="disabled" />
```

### 2. Using the `sx` Prop

The `sx` prop allows for more advanced styling:

```tsx
<ArrowLeft24Icon 
  sx={{ 
    color: '#FF5722',
    fontSize: '32px', // Override the default size
    '&:hover': {
      color: '#E64A19',
    }
  }} 
/>
```

### 3. Using CSS Classes

You can apply CSS classes using the `className` prop:

```tsx
<ArrowLeft24Icon className="my-icon-class" />
```

```css
.my-icon-class {
  color: #2196F3;
  transition: transform 0.2s;
}

.my-icon-class:hover {
  transform: scale(1.2);
}
```

### 4. Theming with MUI Theme Provider

For consistent styling across your application, use MUI's theme provider:

```tsx
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
  components: {
    MuiSvgIcon: {
      styleOverrides: {
        root: {
          // Default styles for all icons
          transition: 'all 0.2s',
          '&:hover': {
            transform: 'scale(1.1)',
          },
        },
        fontSizeSmall: {
          // Styles for small icons
          color: '#1976D2',
        },
        fontSizeMedium: {
          // Styles for medium icons
          color: '#388E3C',
        },
        fontSizeLarge: {
          // Styles for large icons
          color: '#D32F2F',
        },
      },
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <MyComponent />
    </ThemeProvider>
  );
}
```

## Advanced Usage

### 1. Customizing Icon Properties

You can pass any prop that MUI's `SvgIcon` accepts (except `fontSize` which is set based on the icon's size):

```tsx
<ArrowLeft24Icon 
  titleAccess="Go back" // Adds a title for accessibility
  htmlColor="#FF5722" // Sets the color using HTML color attribute
  viewBox="0 0 24 24" // Custom viewBox if needed
  shapeRendering="geometricPrecision" // SVG attribute
  focusable={true} // Makes the icon focusable
/>
```

### 2. Using Icons in Buttons

```tsx
import { Button, IconButton } from '@mui/material';

function MyComponent() {
  return (
    <>
      <Button startIcon={<ArrowLeft24Icon />}>
        Back
      </Button>
      
      <IconButton aria-label="delete">
        <Bug16Icon />
      </IconButton>
    </>
  );
}
```

### 3. Animating Icons

```tsx
<ArrowLeft24Icon 
  sx={{ 
    animation: 'spin 2s linear infinite',
    '@keyframes spin': {
      '0%': {
        transform: 'rotate(0deg)',
      },
      '100%': {
        transform: 'rotate(360deg)',
      },
    },
  }} 
/>
```

### 4. Responsive Icon Sizes

```tsx
<ArrowLeft24Icon 
  sx={{ 
    fontSize: {
      xs: 16, // Extra small devices
      sm: 20, // Small devices
      md: 24, // Medium devices
      lg: 28, // Large devices
      xl: 32, // Extra large devices
    },
  }} 
/>
```

### 5. How the Icons Work Internally

Each icon is a React component that wraps the SVG content in MUI's `SvgIcon` component:

```tsx
import { SvgIcon, SvgIconProps } from "@mui/material";

const ArrowLeft24Icon = (props: Omit<SvgIconProps, "fontSize">) => {
  const { sx, ...rest } = props;
  return (
    <SvgIcon sx={{ fontSize: 24, ...sx }} {...rest}>
      {/* SVG content here */}
    </SvgIcon>
  );
};

export default ArrowLeft24Icon;
```

This structure allows you to leverage all the styling and theming capabilities of MUI's `SvgIcon` component while maintaining the specific size and design of each icon.

## How to add new Icons

1. Rename the SVG file to use camelCase eg: `arrowUp.svg`
2. For monochrome SVGs, `./icons` folder is the main directory to store SVG files. If a new subfolder is required try to use just the size name. eg: `./icons/24px`.
3. For illustrations SVGs, `./illustrations` folder is the location to store them. These SVGs are copied as-is into the `./dist` folder.
4. Add the new SVG file to appropriate folder under **icons** directory
5. Create a Pull Request and then release the package. Instructions can be found [here](https://docs.github.com/en/repositories/releasing-projects-on-github/managing-releases-in-a-repository#creating-a-release) for package release.

**Note for developers** : Don't forget to include one of the following values in a commit, before pushing your branch to master. This would trigger an automated package version update.

| Value | Defintition                                                               |
| ----- | ------------------------------------------------------------------------- |
| major | MAJOR version when you make incompatible API changes                      |
| minor | MINOR version when you add functionality in a backwards compatible manner |
| patch | PATCH version when you make backwards compatible bug fixes                |

[Semantic Versioning](https://semver.org/)

6. Publish new version when changes are merged:

   <img width="298" alt="image" src="https://github.com/SolaceLabs/maas-icons/assets/102637515/4aab42ee-5c07-4539-97e9-ad8074a18975">

   Navigate to releases, then click on draft new release, select the tag corresponding to the semantic version you just created, generate release notes then click on publish release.

   <img width="980" alt="image" src="https://github.com/SolaceLabs/maas-icons/assets/102637515/eaef76d2-11f2-4296-9f55-2a71a9a6cde5">

   You can monitor the state of your release under the Actions tab.

   <img width="1581" alt="image" src="https://github.com/SolaceLabs/maas-icons/assets/102637515/0adff151-0a3b-4aaf-8056-8019b59f7773">

## Updating Copyright Notices

To ensure all SVG files have an up-to-date copyright notice, you can run the `addCopyrightToSvgs.js` script. This script will automatically add or update the copyright header in all SVG files across the `icons`, `illustrations`, `images`, and `logo` directories.

The script dynamically sets the copyright year to the current year, so you can run it at any time to keep the copyright notices current.

To run the script, use the following command:

```bash
node scripts/addCopyrightToSvgs.js
```

## License

Apache-2.0 © [Solace Systems](https://github.com/SolaceLabs)
