import { deckMenuOptions } from 'app/menu-configs/decks';
import { MenuPageLayout } from 'app/layouts/menu-page';

export default async function Page() {
    return <MenuPageLayout title='Decks' options={deckMenuOptions} />;
}
