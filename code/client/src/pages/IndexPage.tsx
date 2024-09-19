import { trpc } from '../utils/trpc';

export default function IndexPage() {
    const userQuery = trpc.hello.useQuery('rapaziada')

    return (
        <div>
            <p>{userQuery.data ?? 'Loading...'}</p>
        </div>
    );
}