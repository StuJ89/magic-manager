import { cardMenuOptions } from 'app/menu-configs/cards';
import { MenuPageLayout } from 'app/layouts/menu-page';

export default async function Page() {
    return <MenuPageLayout title='Cards' options={cardMenuOptions} />;
}
