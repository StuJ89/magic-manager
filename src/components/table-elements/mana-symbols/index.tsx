import { WhiteManaSymbol } from 'app/icons/mana-symbols/white';
import { BlueManaSymbol } from 'app/icons/mana-symbols/blue';
import { BlackManaSymbol } from 'app/icons/mana-symbols/black';
import { RedManaSymbol } from 'app/icons/mana-symbols/red';
import { GreenManaSymbol } from 'app/icons/mana-symbols/green';

import css from './index.module.css';

type ManaSymbolsProps = {
    manaElements: string[];
};

export function ManaSymbols(props: ManaSymbolsProps) {
    return (
        <div className={css.manaContainer}>
            {props.manaElements.map((mana: string, index: number) => {
                let manaSymbol = null;

                if (typeof parseInt(mana) === 'number') {
                    manaSymbol = <div className={css.manaNumber}>{mana}</div>;
                }

                if (mana === 'X') {
                    manaSymbol = 'X';
                }

                if (mana === 'W') {
                    manaSymbol = <WhiteManaSymbol />;
                }
                if (mana === 'U') {
                    manaSymbol = <BlueManaSymbol />;
                }
                if (mana === 'B') {
                    manaSymbol = <BlackManaSymbol />;
                }
                if (mana === 'R') {
                    manaSymbol = <RedManaSymbol />;
                }
                if (mana === 'G') {
                    manaSymbol = <GreenManaSymbol />;
                }

                return (
                    <div key={index} className={css.manaSymbol}>
                        {manaSymbol}
                    </div>
                );
            })}
        </div>
    );
}
