declare module '*.jpg';
declare module '*.png';
declare const process:{
    env:{
        REACT_APP_API_URL: string,
    }
};


declare module "*.svg" {
    import React = require("react");
    export const ReactComponent: React.FC<React.SVGProps<SVGSVGElement>>;
    const src: string;
    export default src;
  }
