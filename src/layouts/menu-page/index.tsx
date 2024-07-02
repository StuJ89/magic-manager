import { Menu } from 'app/components/menu-elements/menu';
import { MenuItem } from 'app/components/menu-elements/menu-item';

import PageLayout from 'app/layouts/page';

type MenuPageLayoutProps = {
    title: string;
    options: MenuItem[];
};

export function MenuPageLayout(props: MenuPageLayoutProps) {
    return (
        <PageLayout title={props.title}>
            <Menu options={props.options} />
        </PageLayout>
    );
}
