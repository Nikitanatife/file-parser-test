export const GET_DONATIONS = `with total_donations as (
    select
        e.department_id,
        (sum(case
                when t3."type" = 'donation' then t3.amount
                else 0
            end) / count(e.id)) as donation_ration,
        (
        select
            sum(t2.amount)
        from
            "transaction" t2
        where
            t2."type" = 'donation') as d_total
    from
         employee e
    left join "transaction" t3 on
         t3.employee_id = e.id
    group by
         e.department_id
    order by (sum(case
                    when t3."type" = 'donation' then t3.amount
                    else 0
                  end) / count(e.id)) desc
    limit 1)
select
    employees_donations.employee_id,
        employees_donations.sum as employee_donation,
        e.department_id,
        (select d_total from total_donations) as total_donations_amount,
    case
        when employees_donations."sum" > 100
        then 10000 * employees_donations."sum"::float / (select d_total from total_donations)
        when employees_donations."sum" <= 100
        then 0
    end employee_donation_bonus,
    case
        when e.department_id = (select department_id from total_donations)
        and (select count(*) from "transaction" t4 where e.id = t4.employee_id and t4."type" = 'donation') > 0
        then 100
        else 0
    end department_donation_bonus
from
(
    select
        DATE_TRUNC('month', t1."date") as "date",
        sum(t1.amount),
        t1.employee_id
    from
        "transaction" t1
    where
        t1."type" = 'donation'
    group by
        DATE_TRUNC('month', t1."date"),
        t1.employee_id
) as employees_donations
left join employee e on
    employees_donations.employee_id = e.id`;
