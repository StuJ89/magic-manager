import { ReactNode } from 'react';
import css from './index.module.css';
import { RedManaSymbol } from 'app/icons/mana-symbols/red';
import { BlueManaSymbol } from 'app/icons/mana-symbols/blue';
import { WhiteManaSymbol } from 'app/icons/mana-symbols/white';
import { BlackManaSymbol } from 'app/icons/mana-symbols/black';
import { GreenManaSymbol } from 'app/icons/mana-symbols/green';

type TableData = {
    _id: string;
    [key: string]: any;
};

type TableProps = {
    readonly data: TableData[] | null;
    readonly columns: string[];
};

export function Table(props: TableProps) {
    if (!props.data) {
        return <div>Loading...</div>;
    }

    const formatTableData = (): ReactNode => {
        if (!props.data) {
            return null;
        }

        const tableData = props.data.map((row: TableData) => {
            return (
                <tr key={row._id} className={css.row}>
                    {props.columns.map((column: string) => {
                        if (column === 'colours') {
                            return (
                                <td key={column} className={css.manaContainer}>
                                    {row['colours'].map((colour: string) => {
                                        let manaSymbol = null;

                                        if (colour === 'W') {
                                            manaSymbol = <WhiteManaSymbol />;
                                        }
                                        if (colour === 'U') {
                                            manaSymbol = <BlueManaSymbol />;
                                        }
                                        if (colour === 'B') {
                                            manaSymbol = <BlackManaSymbol />;
                                        }
                                        if (colour === 'R') {
                                            manaSymbol = <RedManaSymbol />;
                                        }
                                        if (colour === 'G') {
                                            manaSymbol = <GreenManaSymbol />;
                                        }

                                        return (
                                            <div key={colour} className={css.manaSymbol}>
                                                {manaSymbol}
                                            </div>
                                        );
                                    })}
                                </td>
                            );
                        }

                        if (column === 'keywords') {
                            return (
                                <td key={column} className={css.cell}>
                                    {row['keywords'].join(', ')}
                                </td>
                            );
                        }

                        return (
                            <td key={column} className={css.cell}>
                                {row[column]}
                            </td>
                        );
                    })}
                </tr>
            );
        });

        return tableData;
    };

    return (
        <div className={css.root}>
            <table className={css.table}>
                <thead>
                    <tr>
                        {props.columns.map((column: string) => (
                            <th key={column} className={css.header}>
                                {column}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>{formatTableData()}</tbody>
            </table>
        </div>
    );
}
