declare module 'react-helmet' {
    import * as React from 'react';
  
    interface HelmetProps {
      base?: any;
      bodyAttributes?: any;
      children?: React.ReactNode;
      defaultTitle?: string;
      defer?: boolean;
      encodeSpecialCharacters?: boolean;
      htmlAttributes?: any;
      onChangeClientState?: (newState: any, addedTags: any, removedTags: any) => void;
      titleTemplate?: string;
      title?: string;
      prioritizeSeoTags?: boolean;
    }
  
    class Helmet extends React.Component<HelmetProps> {}
    export { Helmet };
  }
  