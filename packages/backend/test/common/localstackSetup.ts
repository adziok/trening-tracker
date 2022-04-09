import { GenericContainer } from 'testcontainers';

// TEMP UNUSED
export const localstackSetup = async (awsRegion = 'eu-central-1', bucketName = 'totaly-test-bucket-local') => {
    const localstackContainer = await new GenericContainer('localstack/localstack:latest')
        .withExposedPorts(4566)
        .withEnv('AWS_DEFAULT_REGION', awsRegion)
        .withEnv('EDGE_PORT', '4566')
        .withEnv('SERVICES', 's3, cognito')
        .withEnv('AWS_ACCESS_KEY_ID', '123')
        .withEnv('AWS_SECRET_ACCESS_KEY', '123')
        .withEnv('AWS_REGION', awsRegion)
        .start();

    await localstackContainer.exec([`aws`, `--endpoint-url=http://localhost:4566`, `s3`, `mb`, `s3://${bucketName}`]);

    return {
        port: localstackContainer.getMappedPort(4566),
        host: localstackContainer.getHost(),
        down: () => localstackContainer.stop(),
    };
};
