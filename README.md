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
            <th>Example</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>Shared Iterations</td>
            <td>shared-iterations</td>
            <td>A fixed amount of iterations are shared between a number of VUs.</td>
            <td>  scenarios: {
    contacts: {
      executor: 'shared-iterations',
      vus: 10,
      iterations: 200,
      maxDuration: '30s',
    },
  },</td>
        </tr>
        <tr>
            <td>Per VU Iterations</td>
            <td>per-vu-iterations</td>
            <td>Each VU executes an exact number of iterations.</td>
                        <td>  scenarios: {
    contacts: {
      executor: 'per-vu-iterations',
      vus: 10,
      iterations: 20,
      maxDuration: '30s',
    },
  },</td>
        </tr>
        <tr>
            <td>Constant VUs</td>
            <td>constant-vus</td>
            <td>A fixed number of VUs execute as many iterations as possible for a specified amount of time.</td>
                                    <td>  scenarios: {
    contacts: {
      executor: 'constant-vus',
      vus: 10,
      duration: '30s',
    },
  },</td>
        </tr>
        <tr>
            <td>Ramping VUs</td>
            <td>ramping-vus</td>
            <td>A variable number of VUs execute as many iterations as possible for a specified amount of time.</td>
                                                <td>  scenarios: {
    contacts: {
      executor: 'ramping-vus',
      startVUs: 0,
      stages: [
        { duration: '20s', target: 10 },
        { duration: '10s', target: 0 },
      ],
      gracefulRampDown: '0s',
    },
  },</td>
        </tr>
        <tr>
            <td>Constant Arrival Rate</td>
            <td>constant-arrival-rate</td>
            <td>A fixed number of iterations are executed in a specified period of time.</td>
            <td> scenarios: {
    contacts: {
      executor: 'constant-arrival-rate',

      // How long the test lasts
      duration: '30s',

      // How many iterations per timeUnit
      rate: 30,

      // Start `rate` iterations per second
      timeUnit: '1s',

      // Pre-allocate VUs
      preAllocatedVUs: 50,
    },
  }, </td>
        </tr>
        <tr>
            <td>Ramping Arrival Rate</td>
            <td>ramping-arrival-rate</td>
            <td>A variable number of iterations are executed in a specified period of time.</td>
            <td>scenarios: {
    contacts: {
      executor: 'ramping-arrival-rate',

      // Start iterations per `timeUnit`
      startRate: 300,

      // Start `startRate` iterations per minute
      timeUnit: '1m',

      // Pre-allocate necessary VUs.
      preAllocatedVUs: 50,

      stages: [
        // Start 300 iterations per `timeUnit` for the first minute.
        { target: 300, duration: '1m' },

        // Linearly ramp-up to starting 600 iterations per `timeUnit` over the following two minutes.
        { target: 600, duration: '2m' },

        // Continue starting 600 iterations per `timeUnit` for the following four minutes.
        { target: 600, duration: '4m' },

        // Linearly ramp-down to starting 60 iterations per `timeUnit` over the last two minutes.
        { target: 60, duration: '2m' },
      ],
    },
  }, </td>
        </tr>
        <tr>
            <td>Externally Controlled</td>
            <td>externally-controlled</td>
            <td>Control and scale execution at runtime via k6's REST API or the CLI..</td>
            <td>scenarios: {
    contacts: {
      executor: 'externally-controlled',
      vus: 10,
      maxVUs: 50,
      duration: '10m',
    },
  }, </td>
        </tr>
    </tbody>
</table>

