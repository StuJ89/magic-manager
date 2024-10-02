import { MenuPageLayout } from 'app/layouts/menu-page';

import { mainMenuOptions } from 'app/menu-configs/main';

export default async function Page() {
    return <MenuPageLayout title='Magic Manager' options={mainMenuOptions} />;
}
