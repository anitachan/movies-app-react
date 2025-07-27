import { render } from '@testing-library/react';
import { MovieCardSkeleton } from './MovieCardSkeleton';

describe('MovieCardSkeleton', () => {
	test('MovieCardSkeleton matches snapshot', () => {
		const { container } = render(<MovieCardSkeleton />);
		expect(container).toMatchSnapshot();
	});
});
