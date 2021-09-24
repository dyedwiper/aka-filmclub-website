import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import {
    NUMBER_OF_SEEDS_IN_GHS_BIO,
    ROUTE_INTERN_ADD_BILLING,
    ROUTE_INTERN_BILLING,
    ROUTE_SCREENING,
} from '../../constants';
import { formatToDateTimeString } from '../../utils/dateFormatters';
import billingIcon from '../../assets/billing_icon.png';
import { toEuroWithSymbol } from '../../utils/moneyFormatters';

export default function AdmissionListItem({ screening, isUserEditor }) {
    return (
        <ListItemStyled>
            {screening.billing ? (
                <>
                    <AdmissionsStyled title="Verkaufte Eintrittskarten plus Freikarten">
                        {screening.billing.ticketsCount + screening.billing.freeTickets}
                    </AdmissionsStyled>
                    <PassesStyled title="Verkaufte Ausweise">{'(' + screening.billing.passesCount + ')'}</PassesStyled>
                    <BalanceStyled
                        title="Einnahmen aus Ticketverkauf minus Filmmiete und Nebenkosten (ohne Mehrwertsteuer wegen Erstattung)"
                        isNegative={screening.billing.balance < 0}
                    >
                        {toEuroWithSymbol(screening.billing.balance)}
                    </BalanceStyled>
                    <DiagramContainerStyled>
                        <DiagramStyled admissions={screening.billing.ticketsCount + screening.billing.freeTickets} />
                    </DiagramContainerStyled>
                </>
            ) : (
                <>
                    <AdmissionsStyled>?</AdmissionsStyled>
                    <PassesStyled>?</PassesStyled>
                    <BalanceStyled>?</BalanceStyled>
                    <DiagramContainerStyled>
                        <DiagramStyled admissions={0} />
                    </DiagramContainerStyled>
                </>
            )}
            <DateStyled>{formatToDateTimeString(screening.date)}</DateStyled>
            <TitleLinkStyled to={ROUTE_SCREENING + screening.uuid}>{screening.title}</TitleLinkStyled>
            {screening.billing ? (
                <BillingLinkStyled to={ROUTE_INTERN_BILLING + screening.billing.uuid}>
                    <IconStyled src={billingIcon} />
                </BillingLinkStyled>
            ) : (
                isUserEditor && (
                    <BillingLinkStyled to={ROUTE_INTERN_ADD_BILLING + screening.uuid}>
                        <IconStyled src={billingIcon} />+
                    </BillingLinkStyled>
                )
            )}
        </ListItemStyled>
    );
}

const ListItemStyled = styled.li``;

const AdmissionsStyled = styled.div`
    display: inline-block;
    width: 30px;
    margin-right: 5px;
    text-align: right;
    font-weight: bold;
`;

const PassesStyled = styled.div`
    display: inline-block;
    width: 40px;
    margin-right: 10px;
    text-align: right;
`;

const BalanceStyled = styled.div`
    display: inline-block;
    width: 80px;
    margin-right: 10px;
    text-align: right;
    font-weight: bold;
    color: ${(props) => props.isNegative && 'var(--aka-red)'};
`;

const DiagramContainerStyled = styled.div`
    display: inline-block;
    width: 100px;
    margin-right: 10px;
`;

const DiagramStyled = styled.div`
    width: ${(props) => (props.admissions / NUMBER_OF_SEEDS_IN_GHS_BIO) * 100 + '%'};
    height: 10px;
    background-color: var(--aka-gelb);
`;

const DateStyled = styled.div`
    display: inline-block;
    margin-right: 10px;
`;

const TitleLinkStyled = styled(Link)`
    display: inline-block;
    max-width: 300px;
    overflow-x: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    // The alignment must be set here, see https://stackoverflow.com/questions/9273016.
    vertical-align: bottom;
`;

const BillingLinkStyled = styled(Link)`
    margin-left: 10px;

    &.active,
    &:hover {
        text-decoration: none;
    }
`;

const IconStyled = styled.img`
    height: 16px;
`;
