import { MenuPageLayout } from 'app/layouts/menu-page';

import { tournamentMenuOptions } from 'app/menu-configs/tournaments';

export default async function Page() {
    return <MenuPageLayout title='Tournaments' options={tournamentMenuOptions}></MenuPageLayout>;
}
