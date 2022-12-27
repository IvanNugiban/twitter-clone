import React from "react";
import IComponentWithChildren from "./IComponentWithChildren";

interface ITypography extends IComponentWithChildren{
    children: React.ReactNode;
    className?: string;
}



export default ITypography;