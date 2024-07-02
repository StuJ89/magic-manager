import { mainMenuOptions } from 'app/menu-configs/main';
import { MenuPageLayout } from '../layouts/menu-page';

export default async function Page() {
    return <MenuPageLayout title='Magic Manager' options={mainMenuOptions} />;
}
