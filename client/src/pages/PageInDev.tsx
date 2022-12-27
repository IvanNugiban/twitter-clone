import React from 'react';
import SubTitle from "../ui/atoms/Typography/SubTitle";
import Paragraph from "../ui/atoms/Typography/Paragraph";
import PageHeader from "../ui/molecules/PageHeader";
import H3Title from "../ui/atoms/Typography/H3Title";
import workInProgressImage from "../assets/workInProgress.png";
import styled from "styled-components";
import DocumentTitle from "react-document-title";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  gap: 10px;
  
  img {
    width: 300px;
  }
`

const PageInDev = () => {
    return (
        <React.Fragment>
            <PageHeader content={<H3Title>Page in dev</H3Title>}/>
            <DocumentTitle title="Page in dev / Twitter"/>
            <Wrapper className="wrapper">
                <SubTitle> Sorry, this page currently in development</SubTitle>
                <Paragraph>This feature will be added later... or not :)</Paragraph>
                <img src={workInProgressImage}/>
            </Wrapper>
            </React.Fragment>
    )
        ;
};

export default PageInDev;