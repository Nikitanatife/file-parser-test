export const GET_DEPARTMENTS_WITH_TOP_EMPLOYEES = `select
    departments_rating."department_id",
    d."name" as department_name,
    departments_rating."yearly_diff",
    top_three_employees."name",
    top_three_employees."surname",
    top_three_employees."employee_id",
    top_three_employees."max_salary" as last_salary,
    top_three_employees."salary_diff_percents"
from
(
    select
        e.department_id,
        MAX(yearly."avg") - MIN(yearly."avg") as yearly_diff
    from
        employee e
    join (
        select
            TO_CHAR(DATE_TRUNC('year', t1."date"), 'YYYY') as "year",
            t1.employee_id,
            AVG(t1.amount)
        from
            "transaction" t1
        where
            t1."type" = 'salary'
        group by
            t1.employee_id,
            DATE_TRUNC('year', t1."date")

        ) as yearly
    on
        e.id = yearly.employee_id
    group by
        e.department_id
) as departments_rating
join department d on
    d.id = departments_rating."department_id"
join (
    select
        *
    from
    (
        select
            e.*,
            yearly.*,
            row_number() over (partition by e.department_id order by yearly.salary_diff_percents desc) as rn
        from
            employee e
        join (
            select
                TO_CHAR(DATE_TRUNC('year', t1."date"), 'YYYY') as "year",
                t1.employee_id,
                MAX(t1.amount) as max_salary,
                (((MAX(t1.amount) - MIN(t1.amount)) * 100) / MIN(t1.amount)) as salary_diff_percents
            from
                "transaction" t1
            where
                t1."type" = 'salary'
            group by
                t1.employee_id,
                DATE_TRUNC('year', t1."date")
            ) as yearly
        on
            yearly.employee_id = e.id) as diffData
        where
            diffData.rn <= 3
) as top_three_employees
on
    top_three_employees.department_id = departments_rating.department_id
order by
    departments_rating."yearly_diff" desc`;
