import { ReactNode } from 'react';

import PageLayout from 'app/layouts/page';

type FormPageLayoutProps = {
    title: string;
    children: ReactNode;
};

export function FormPageLayout(props: FormPageLayoutProps) {
    return <PageLayout title={props.title}>{props.children}</PageLayout>;
}
