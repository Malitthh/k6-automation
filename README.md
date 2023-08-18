## K6-Automation

Grafana dashbord - 
run with command K6 run --out influxdb=http://localhost:9999/load_test //LoadTest script.js, while make sure index db is running

K6 Docs - 
https://k6.io/docs/

1. Installation
2. Executors  
3. Scenarios 
4. Checks 
5. Thresholds 
6. Running k6 
7. Results output 
8. k6 resources

### Executors
Executors control how k6 schedules VUs and iterations. The executor that you choose depends on the goals of your test and the type of traffic you want to model.

Define the executor in executor key of the scenario object. The value is the executor name separated by hyphens.

<table>
    <thead>
        <tr>
            <th>NAME</th>
            <th>VALUE</th>
            <th>DESCRIPTION</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>Shared Iterations</td>
            <td>shared-iterations</td>
            <td>A fixed amount of iterations are shared between a number of VUs.</td>
        </tr>
        <tr>
            <td>Per VU Iterations</td>
            <td>per-vu-iterations</td>
            <td>Each VU executes an exact number of iterations.</td>
        </tr>
        <tr>
            <td>Constant VUs</td>
            <td>constant-vus</td>
            <td>A fixed number of VUs execute as many iterations as possible for a specified amount of time.</td>
        </tr>
        <tr>
            <td>Ramping VUs</td>
            <td>ramping-vus</td>
            <td>A variable number of VUs execute as many iterations as possible for a specified amount of time.</td>
        </tr>
        <tr>
            <td>Constant Arrival Rate</td>
            <td>constant-arrival-rate</td>
            <td>A fixed number of iterations are executed in a specified period of time.</td>
        </tr>
        <tr>
            <td>Ramping Arrival Rate</td>
            <td>ramping-arrival-rate</td>
            <td>A variable number of iterations are executed in a specified period of time.</td>
        </tr>
        <tr>
            <td>Externally Controlled</td>
            <td>externally-controlled</td>
            <td>Control and scale execution at runtime via k6's REST API or the CLI..</td>
        </tr>
    </tbody>
</table>

