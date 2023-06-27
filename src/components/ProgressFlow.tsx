import React from 'react';
import { PropsWithChildren, useState } from 'react';
import styled from 'styled-components';

export type ProgressFlowProps = {
    onComplete: () => void
}

const FlowContainer = styled.div`
    max-width: 80%;
    margin: 20px;
    padding: 20px;
    border: 1px solid grey;
    border-radius: 2px;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const FlowFooter = styled.div`
`;

const ProgressContainer = styled.div`
    display: flex;
    justify-content: space-between;
    position: relative;
    margin-bottom: 30px;
    max-width: 100%;
    width: 350px;
`;

const ProgressBar = styled.div<{ $progressPercent: string}>`
    background-color: #3498db;
    position: absolute;
    top: 50%;
    left: 0;
    height: 4px;
    width: ${(props) => props.$progressPercent };
    transform: translateY(-50%);
    transition: 0.4s ease;
    z-index: -1;

   /*  &::after {
        content: '';
        display: inline-block;
        position: absolute;
        top: 50%;
        left: 0;
        height: 4px;
        background-color: #e0e0e0;
        width: 350px;
        transform: translateY(-50%) translateZ(-1px);
    } */
`;

const ProgressBarBackground = styled.div`
        position: absolute;
        top: 50%;
        left: 0;
        height: 4px;
        background-color: #e0e0e0;
        width: 350px;
        transform: translateY(-50%);
        z-index: -2;
`;

const ProgressCircle = styled.div<{ $active?: boolean}>`
    background-color: #fff;
    color: #999;
    border-radius: 50%;
    width: 30px;
    height: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
    border: ${(props) => props.$active ? '3px solid #3498db' : '3px solid #e0e0e0'};
    transition: 0.4s ease;
`;

const ProgressButton = styled.button`
    background-color: ${(props) => props.disabled ? '#e0e0e0': '#3498db'};
    color: #fff;
    border: 0;
    border-radius: 6px;
    cursor: ${(props) => props.disabled ? 'not-allowed' : 'pointer' };;
    padding: 8px;
    margin: 5px;
    font-size: 14px;
    width: 100px;

    &.active {
        transform: scale(0.98);
    }

    &.focus {
        outline: 0;
    }
`;

const ButtonContainer = styled.div`
    display: flex;
    justify-content: center;
`;

const ProgressFlow = ({ children, onComplete }: PropsWithChildren<ProgressFlowProps>) => {
    const [ currentIndex, setCurrentIndex ] = useState(0);

    const currentChild = React.Children.toArray(children)[currentIndex];
    const numChildren = React.Children.toArray(children).length;

    const handleOnNext = () => {
        if (currentIndex === numChildren - 1) {
            onComplete();
        } else {
            setCurrentIndex(currentIndex + 1);
        }
    }

    const handleOnPrevious = () => {
        if (currentIndex !== 0) {
            setCurrentIndex(currentIndex - 1);
        }
    }

    return (
        <FlowContainer>
            { currentChild }
            <FlowFooter>
                <ProgressContainer>
                    <ProgressBar $progressPercent={ `${(currentIndex / (numChildren - 1)) * 100}%` } />
                    <ProgressBarBackground />
                    {
                        [...Array(numChildren)].map((e, i) => (
                        <ProgressCircle 
                            key={i}
                            $active={ i === currentIndex || i < currentIndex}>
                            { i + 1}
                        </ProgressCircle>
                        ))
                    }
                </ProgressContainer>
                <ButtonContainer>
                    <ProgressButton disabled={ currentIndex === 0 } onClick={ handleOnPrevious }>Previous</ProgressButton>
                    <ProgressButton disabled={ currentIndex === numChildren - 1 } onClick={ handleOnNext }>Next</ProgressButton>
                </ButtonContainer>
            </FlowFooter>
        </FlowContainer>
    )
}

export default ProgressFlow;