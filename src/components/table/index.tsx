import { ReactNode } from 'react';
import css from './index.module.css';
import { RedManaSymbol } from 'app/icons/mana-symbols/red';
import { BlueManaSymbol } from 'app/icons/mana-symbols/blue';
import { WhiteManaSymbol } from 'app/icons/mana-symbols/white';
import { BlackManaSymbol } from 'app/icons/mana-symbols/black';
import { GreenManaSymbol } from 'app/icons/mana-symbols/green';
import { ObjectId } from 'mongodb';
import { ManaSymbols } from '../table-elements/mana-symbols';

type TableData = {
    _id: string | ObjectId;
    [key: string]: any;
};

type TableProps = {
    readonly data: TableData[] | null;
    readonly columns: string[];
    readonly onClick?: (id: string) => void;
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
                <tr
                    key={row._id as string}
                    className={props.onClick ? `${css.row} ${css.rowOnClick}` : css.row}
                    onClick={() => props.onClick?.(row._id as string)}>
                    {props.columns.map((column: string) => {
                        if (column === 'colours') {
                            return (
                                <td key={column} className={css.cell}>
                                    <ManaSymbols manaElements={row['colours']} />
                                </td>
                            );
                        }

                        if (column === 'manaCost') {
                            return (
                                <td key={column} className={css.cell}>
                                    <ManaSymbols manaElements={row['manaCost'].split('')} />
                                    {/* <div className={css.manaContainer}>
                                        {manaElements.map((mana: string, index: number) => {
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
                                    </div> */}
                                </td>
                            );
                        }

                        if (column === 'cardType') {
                            return (
                                <td key={column} className={css.cell}>
                                    {row['cardType'].join(', ')}
                                </td>
                            );
                        }

                        if (column === 'subTypes') {
                            return (
                                <td key={column} className={css.cell}>
                                    {row['subTypes'].join(' ')}
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

                        if (column === 'quantity') {
                            return (
                                <td key={column} className={css.cell}>
                                    {row['quantity'].total}
                                </td>
                            );
                        }

                        if (column === 'inDecks') {
                            return (
                                <td key={column} className={css.cell}>
                                    {row['quantity'].inDecks}
                                </td>
                            );
                        }

                        if (column === 'value') {
                            const standardValue = row['price']['standard'] * row['quantity']['standard'];
                            const foilValue = row['price']['foil'] * row['quantity']['foil'];

                            return (
                                <td key={column} className={css.cell}>
                                    {'£' + (standardValue + foilValue).toFixed(2)}
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
                        {props.columns.map((column: string) => {
                            const columnTitle = column.split(/(?=[A-Z])/).join(' ');

                            return (
                                <th key={column} className={css.header}>
                                    {columnTitle}
                                </th>
                            );
                        })}
                    </tr>
                </thead>
                <tbody>{formatTableData()}</tbody>
            </table>
        </div>
    );
}
