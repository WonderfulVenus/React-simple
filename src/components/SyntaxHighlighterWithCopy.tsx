import * as React from 'react';
import styled from 'styled-components';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { xonokai } from 'react-syntax-highlighter/dist/styles/prism';
import copyClipBoard from './utils/copyClipBoard';
import generateCode from './logic/generateCode';
import colors from '../styles/colors';
import track from './utils/track';
import breakpoints from "../styles/breakpoints";

const CopyButton = styled.button`
  background: ${colors.lightBlue};
  border: none;
  color: white;
  border-radius: 4px;
  font-size: 16px;
  padding: 5px 10px;
  position: absolute;
  right: 20px;
  z-index: 1;
  top: 10px;
  box-shadow: 0 0 10px ${colors.black};
  display: none;
  cursor: pointer;

  @media ${breakpoints.fromMediumScreen} {
    display: inline-block;
  }

  &:hover {
    opacity: 0.8;
    color: white;
  }

  &:active {
    transform: translateY(2px);
  }
`;

export const LinkToSandBox = styled(CopyButton)`
  background: ${colors.lightPink};

  @media ${breakpoints.fromMediumScreen} {
    right: 180px;
  }
`;

const SyntaxHighlighterWrapper = styled.div`
  & pre {
    padding-top: 50px !important;
    line-height: 1.6 !important;

    @media ${breakpoints.fromLargeScreen} {
      padding-top: 20px !important;
    }
  }
`;

export default function SyntaxHighlighterWithCopy({ rawData, data, url, tabIndex, withOutCopy }: any) {
  return (
    <div
      style={{
        position: 'relative',
      }}
    >
      {!withOutCopy && (
        <CopyButton
          tabIndex={tabIndex}
          onClick={() => {
            track({
              label: 'Copy',
              category: 'Copy Button',
              action: 'Click - Copy code',
            });
            rawData || copyClipBoard(generateCode(data));
            alert('Code copied into your clipboard.');
          }}
          aria-label="Copy code into your clipboard"
        >
          Copy to clipboard
        </CopyButton>
      )}

      {url && (
        <LinkToSandBox
          onClick={() => {
            track({
              label: 'CodeSandbox',
              category: 'Button',
              action: `Click - Go to codeSandBox ${url}`,
            });
          }}
          tabIndex={tabIndex}
          href={url}
          target="_blank"
        >
          CodeSandbox
        </LinkToSandBox>
      )}
      <SyntaxHighlighterWrapper>
        <SyntaxHighlighter
          customStyle={{
            border: 'none',
          }}
          style={xonokai}
          language={'jsx'}
        >
          {rawData || generateCode(data)}
        </SyntaxHighlighter>
      </SyntaxHighlighterWrapper>
    </div>
  );
}
