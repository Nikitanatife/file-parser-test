export const GET_EMPLOYEES_DONATED_MOST = `SELECT 
                e.*,
                monthlyData.avgMonthSalary,
                monthlyData.donations,
                minYearly."minYearly"
            FROM
                "employee" e
            JOIN
                (
                SELECT
                    t2.employee_id as employee,
                    AVG(t2.amount) as avgMonthSalary,
                    SUM(t3.amount) as donations
                FROM
                    (
                    SELECT
                        t1.employee_id as "employee",
                        MAX(t1."date")
                    FROM
                        "transaction" t1
                    WHERE
                        t1.type = 'salary'
                    GROUP BY
                        t1.employee_id
                    ORDER BY
                        MAX(t1."date") DESC
                    ) as maxDates
                JOIN "transaction" t2 ON
                    t2.employee_id = maxDates.employee
                    AND t2."type" = 'salary'
                    AND t2."date" <= maxDates.max
                    AND t2."date" <= maxDates.max - interval '6 month'
                LEFT JOIN "transaction" t3 ON
                    t3.employee_id = maxDates.employee
                    AND t3."type" = 'donation'
                    AND t3."date" <= maxDates.max
                    AND t3."date" <= maxDates.max - interval '6 month'
                GROUP BY
                    t2.employee_id
                HAVING
                    (AVG(t2.amount) * 10 / 100) < SUM(t3.amount)
                ) as monthlyData ON e.id = monthlyData.employee
            LEFT JOIN (
                SELECT
                    yearly.employee as "employee",
                    MIN(yearly."avg") as "minYearly"
                FROM
                    (
                    SELECT
                        TO_CHAR(DATE_TRUNC('year', t4."date"), 'YYYY') as "year",
                        t4.employee_id as employee,
                        AVG(t4.amount)
                    FROM
                        "transaction" t4
                    WHERE
                        t4."type" = 'salary'
                    GROUP BY
                        DATE_TRUNC('year', t4."date"),
                        t4.employee_id
                    ) as yearly
                GROUP BY
                    yearly.employee
            ) as minYearly ON
                minYearly.employee = monthlyData.employee
           ORDER BY minYearly."minYearly"`;
