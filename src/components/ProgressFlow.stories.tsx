import { Meta, StoryFn } from "@storybook/react";
import ProgressFlow, { ProgressFlowProps } from "./ProgressFlow";

const ProgressFlowMeta: Meta<ProgressFlowProps> = {
    component: ProgressFlow,
    title: "Progress Flow"
};

export default ProgressFlowMeta;

const ProgressFlowTemplate = () => {

    const handleOnComplete = () => {
        console.log("Finished!");
    }

    return (
        <ProgressFlow onComplete={ handleOnComplete }>
            <h1>Sample Child 1</h1>
            <h1>Sample Child 2</h1>
            <h1>Sample Child 3</h1>
            <h1>Sample Child 4</h1>
        </ProgressFlow>
    )
}

export const DefaultProgressFlow: StoryFn<ProgressFlowProps> = ProgressFlowTemplate.bind({});