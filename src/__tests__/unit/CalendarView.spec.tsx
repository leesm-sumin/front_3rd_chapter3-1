import { ChakraProvider } from '@chakra-ui/react';
import { fireEvent, render, screen } from '@testing-library/react';

import { CalendarView } from '../../components/CalendarView';
import { CalendarViewHookProvider } from '../../providers/CalendarViewHookProvider';
import { Event } from '../../types';

describe('CalendarView', () => {
  const events: Event[] = [
    {
      id: '1',
      title: '이벤트 1',
      date: '2024-07-01',
      startTime: '09:00',
      endTime: '10:00',
      description: '행사 1',
      location: '서울',
      category: '업무',
      repeat: {
        type: 'none',
        interval: 0,
      },
      notificationTime: 10,
    },
    {
      id: '2',
      title: '이벤트 2',
      date: '2024-07-05',
      startTime: '13:00',
      endTime: '14:00',
      description: '행사 2',
      location: '인천',
      category: '업무',
      repeat: { type: 'none', interval: 0 },
      notificationTime: 10,
    },
    {
      id: '3',
      title: '이벤트 3',
      date: '2024-07-09',
      startTime: '15:00',
      endTime: '16:00',
      description: '행사 3',
      location: '대구',
      category: '업무',
      repeat: { type: 'none', interval: 1 },
      notificationTime: 10,
    },
    {
      id: '4',
      title: 'Event 4',
      date: '2024-08-23',
      startTime: '17:00',
      endTime: '18:00',
      description: '행사 4',
      location: '부산',
      category: '업무',
      repeat: { type: 'none', interval: 0 },
      notificationTime: 10,
    },
    {
      id: '5',
      title: 'event 5',
      date: '2024-08-31',
      startTime: '19:00',
      endTime: '20:00',
      description: '행사 5',
      location: '광주',
      category: '업무',
      repeat: { type: 'none', interval: 0 },
      notificationTime: 10,
    },
    {
      id: '6',
      title: 'event 6',
      date: '2024-09-01',
      startTime: '19:00',
      endTime: '20:00',
      description: '행사 6',
      location: '제주',
      category: '업무',
      repeat: { type: 'none', interval: 0 },
      notificationTime: 10,
    },
  ];

  beforeEach(() => {
    render(
      <ChakraProvider>
        <CalendarViewHookProvider>
          <CalendarView events={events} />
        </CalendarViewHookProvider>
      </ChakraProvider>
    );
  });

  it('초기 상태에서 월간 뷰를 보여준다.', () => {
    const monthView = screen.getByTestId('month-view');

    expect(monthView).toBeInTheDocument();
  });

  describe('월간 뷰', () => {
    it('월간 뷰에서 주간 뷰로 변경할 수 있다.', () => {
      const select = screen.getByRole('combobox');

      fireEvent.change(select, { target: { value: 'week' } });

      expect(screen.getByTestId('week-view')).toBeInTheDocument();
    });

    it('월간 뷰에서 현재 월에서 다음 월로 이동할 수 있다.', () => {
      const nextButton = screen.getByLabelText('Next');

      fireEvent.click(nextButton);

      expect(screen.getByTestId('month-view')).toHaveTextContent('2024년 11월');
    });
  });

  describe('주간 뷰', () => {
    beforeEach(() => {
      const select = screen.getByRole('combobox');

      fireEvent.change(select, { target: { value: 'week' } });
    });

    it('주간 뷰에서 월간 뷰로 전환할 수 있다.', () => {
      const select = screen.getByRole('combobox');

      fireEvent.change(select, { target: { value: 'month' } });

      expect(screen.getByTestId('month-view')).toBeInTheDocument();
    });

    it('주간 뷰에서 현재 주에서 다음 주로 이동할 수 있다.', () => {
      const nextButton = screen.getByLabelText('Next');

      fireEvent.click(nextButton);

      expect(screen.getByTestId('week-view')).toHaveTextContent('2024년 10월 2주');
    });
  });
});
