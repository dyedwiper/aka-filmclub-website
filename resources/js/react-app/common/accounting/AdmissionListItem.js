import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { NUMBER_OF_SEEDS_IN_GHS_BIO } from '../../constants';
import { formatToDateTimeString } from '../../utils/dateFormatters';
import billingIcon from '../../assets/billing_icon.png';
import { toEuro } from '../../utils/moneyUtils';

export default function AdmissionListItem({ screening }) {
    return (
        <ListItemStyled>
            {screening.billing ? (
                <>
                    <AdmissionsStyled>{screening.billing.soldTickets + screening.billing.freeTickets}</AdmissionsStyled>
                    <PassesStyled>{'(' + screening.billing.soldPasses + ')'}</PassesStyled>
                    <ProfitStyled isNegative={screening.billing.profit < 0}>
                        {toEuro(screening.billing.profit)}
                    </ProfitStyled>
                    <DiagramContainerStyled>
                        <DiagramStyled admissions={screening.billing.soldTickets + screening.billing.freeTickets} />
                    </DiagramContainerStyled>
                </>
            ) : (
                <>
                    <AdmissionsStyled>?</AdmissionsStyled>
                    <PassesStyled>?</PassesStyled>
                    <ProfitStyled>?</ProfitStyled>
                    <DiagramContainerStyled>
                        <DiagramStyled admissions={0} />
                    </DiagramContainerStyled>
                </>
            )}
            <DateStyled>{formatToDateTimeString(screening.date)}</DateStyled>
            <TitleLinkStyled to={'/screening/' + screening.uuid}>{screening.title}</TitleLinkStyled>
            {screening.billing ? (
                <BillingLinkStyled to={'/intern/billing/' + screening.billing.uuid}>
                    <IconStyled src={billingIcon} />
                </BillingLinkStyled>
            ) : (
                <BillingLinkStyled>
                    <IconStyled src={billingIcon} />
                </BillingLinkStyled>
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

const ProfitStyled = styled.div`
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
    margin-left: 5px;
`;

const IconStyled = styled.img`
    height: 16px;
`;
