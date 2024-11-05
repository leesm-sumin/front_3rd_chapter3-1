import { Event } from '../../types';
import { createNotificationMessage, getUpcomingEvents } from '../../utils/notificationUtils';

describe('getUpcomingEvents', () => {
  const events: Event[] = [
    {
      id: '1',
      title: 'event1',
      date: '2024-12-01',
      startTime: '10:00',
      endTime: '11:00',
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
      title: 'event2',
      date: '2024-12-01',
      startTime: '13:00',
      endTime: '14:00',
      description: '행사 2',
      location: '인천',
      category: '업무',
      repeat: { type: 'none', interval: 0 },
      notificationTime: 10,
    },
  ];

  it('알림 시간이 정확히 도래한 이벤트를 반환한다', () => {
    const upcomingEvents = getUpcomingEvents(events, new Date('2024-12-01T09:50'), []);

    expect(upcomingEvents).toEqual([
      {
        id: '1',
        title: 'event1',
        date: '2024-12-01',
        startTime: '10:00',
        endTime: '11:00',
        description: '행사 1',
        location: '서울',
        category: '업무',
        repeat: {
          type: 'none',
          interval: 0,
        },
        notificationTime: 10,
      },
    ]);
  });

  it('이미 알림이 간 이벤트는 제외한다', () => {
    const upcomingEvents = getUpcomingEvents(events, new Date('2024-12-01T09:50'), ['1']);

    expect(upcomingEvents).toEqual([]);
  });

  it('알림 시간이 아직 도래하지 않은 이벤트는 반환하지 않는다', () => {
    const upcomingEvents = getUpcomingEvents(events, new Date('2024-12-01T12:00'), []);

    expect(upcomingEvents).toEqual([]);
  });

  it('알림 시간이 지난 이벤트는 반환하지 않는다', () => {
    const upcomingEvents = getUpcomingEvents(events, new Date('2024-12-01T13:00'), []);

    expect(upcomingEvents).toEqual([]);
  });
});

describe('createNotificationMessage', () => {
  it('올바른 알림 메시지를 생성해야 한다', () => {
    const event: Event = {
      id: '1',
      title: 'event1',
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
    };

    const message = createNotificationMessage(event);

    expect(message).toBe(`${event.notificationTime}분 후 ${event.title} 일정이 시작됩니다.`);
  });
});
