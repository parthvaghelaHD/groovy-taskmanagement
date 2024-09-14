import { fileURLToPath } from 'url';
import { dirname } from 'path';
import autocannon from 'autocannon';
import fs from 'fs';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const config = {
    url: 'http://43.205.16.26:3000/tasks', // API endpoint
    connections: 100, // Number of concurrent connections
    duration: 20, // Test duration in seconds
    method: 'GET', // HTTP method
};

// Function to log benchmark results to a file
const logResults = (result) => {
    const logFilePath = path.join(__dirname, 'benchmark-results.log');
    const logMessage = `
    [${new Date().toISOString()}] Benchmark completed
    Requests per second: ${result.requests.average}
    Latency (ms): ${result.latency.average}
    Bytes received/sec: ${result.throughput.average / 1024} KB
  `;

    console.log(logMessage);
    fs.appendFile(logFilePath, logMessage, (err) => {
        if (err) {
            console.error('Error writing benchmark log:', err);
        } else {
            console.log('Benchmark results saved to', logFilePath);
        }
    });
};

// Function to run the benchmark test
const runBenchmark = async () => {
    try {
        console.log(`[${new Date().toISOString()}] Starting benchmark...`);

        // Start autocannon and return an instance
        const instance = autocannon(config, (err, result) => {
            if (err) {
                console.error('Error running benchmark:', err);
            } else {
                logResults(result);
            }
        });

        // Track the progress of the benchmark
        autocannon.track(instance);
    } catch (error) {
        console.error('Unexpected error during benchmark:', error);
    }
};

// Start the benchmark
runBenchmark();
