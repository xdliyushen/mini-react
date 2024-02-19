export type ReactElement = {
    type: String,
    props: {
        children: ReactElement[],
        [key: string]: any,
    }
};
