import { Event } from '../../types';
import {
  convertEventToDateRange,
  findOverlappingEvents,
  isOverlapping,
  parseDateTime,
} from '../../utils/eventOverlap';

describe('parseDateTime', () => {
  it('2024-07-01 14:30을 정확한 Date 객체로 변환한다', () => {
    const date = new Date('2024-07-01 14:30');
    expect(parseDateTime('2024-07-01', '14:30')).toEqual(date);
  });

  it('잘못된 날짜 형식에 대해 Invalid Date를 반환한다', () => {
    expect(parseDateTime('2024-07-011', '14:30')).toEqual(new Date('Invalid Date'));
  });

  it('잘못된 시간 형식에 대해 Invalid Date를 반환한다', () => {
    expect(parseDateTime('2024-07-01', '35:30')).toEqual(new Date('Invalid Date'));
  });

  it('날짜 문자열이 비어있을 때 Invalid Date를 반환한다', () => {
    expect(parseDateTime('', '14:30')).toEqual(new Date('Invalid Date'));
  });
});

describe('convertEventToDateRange', () => {
  it('일반적인 이벤트를 올바른 시작 및 종료 시간을 가진 객체로 변환한다', () => {
    const event: Event = {
      id: '1',
      title: '테스트 이벤트',
      date: '2024-07-01',
      startTime: '14:30',
      endTime: '15:30',
      description: '설명',
      location: '서울',
      category: '행사',
      repeat: { type: 'none', interval: 0 },
      notificationTime: 0,
    };

    expect(convertEventToDateRange(event)).toEqual({
      start: new Date('2024-07-01 14:30'),
      end: new Date('2024-07-01 15:30'),
    });
  });

  it('잘못된 날짜 형식의 이벤트에 대해 Invalid Date를 반환한다', () => {
    const event: Event = {
      id: '1',
      title: '테스트 이벤트',
      date: '',
      startTime: '14:30',
      endTime: '15:30',
      description: '설명',
      location: '서울',
      category: '행사',
      repeat: { type: 'none', interval: 0 },
      notificationTime: 0,
    };

    expect(convertEventToDateRange(event)).toEqual({
      start: new Date('Invalid Date'),
      end: new Date('Invalid Date'),
    });
  });

  it('잘못된 시간 형식의 이벤트에 대해 Invalid Date를 반환한다', () => {
    const event: Event = {
      id: '1',
      title: '테스트 이벤트',
      date: '2024-07-01',
      startTime: '',
      endTime: '',
      description: '설명',
      location: '서울',
      category: '행사',
      repeat: { type: 'none', interval: 0 },
      notificationTime: 0,
    };

    expect(convertEventToDateRange(event)).toEqual({
      start: new Date('Invalid Date'),
      end: new Date('Invalid Date'),
    });
  });
});

describe('isOverlapping', () => {
  it('두 이벤트가 겹치지 않는 경우 false를 반환한다', () => {
    const event1: Event = {
      id: '1',
      title: '테스트 이벤트 1',
      date: '2024-07-01',
      startTime: '14:30',
      endTime: '15:30',
      description: '설명 1',
      location: '서울',
      category: '행사',
      repeat: { type: 'none', interval: 0 },
      notificationTime: 0,
    };

    const event2: Event = {
      id: '2',
      title: '테스트 이벤트 2',
      date: '2024-07-01',
      startTime: '17:00',
      endTime: '20:00',
      description: '설명 2',
      location: '부산',
      category: '행사',
      repeat: { type: 'none', interval: 0 },
      notificationTime: 0,
    };

    expect(isOverlapping(event1, event2)).toBe(false);
  });
});

describe('findOverlappingEvents', () => {
  const events: Event[] = [
    {
      id: '1',
      title: '테스트 이벤트',
      date: '2024-07-01',
      startTime: '14:30',
      endTime: '15:30',
      description: '테스트 설명',
      location: '서울',
      category: 'A',
      repeat: { type: 'none', interval: 0 },
      notificationTime: 10,
    },
    {
      id: '2',
      title: '테스트 이벤트',
      date: '2024-07-01',
      startTime: '17:00',
      endTime: '20:00',
      description: '테스트 설명',
      location: '부산',
      category: 'B',
      repeat: { type: 'none', interval: 0 },
      notificationTime: 10,
    },
  ];

  it('새 이벤트와 겹치는 모든 이벤트를 반환한다', () => {
    const newEvent: Event = {
      id: '3',
      title: '테스트 이벤트',
      date: '2024-07-01',
      startTime: '16:00',
      endTime: '20:00',
      description: '테스트 설명',
      location: '대구',
      category: 'C',
      repeat: { type: 'none', interval: 0 },
      notificationTime: 10,
    };

    expect(findOverlappingEvents(newEvent, events)).toEqual([
      {
        id: '2',
        title: '테스트 이벤트',
        date: '2024-07-01',
        startTime: '17:00',
        endTime: '20:00',
        description: '테스트 설명',
        location: '부산',
        category: 'B',
        repeat: { type: 'none', interval: 0 },
        notificationTime: 10,
      },
    ]);
  });

  it('겹치는 이벤트가 없으면 빈 배열을 반환한다', () => {
    const newEvent: Event = {
      id: '3',
      title: '테스트 이벤트',
      date: '2024-07-01',
      startTime: '07:00',
      endTime: '08:00',
      description: '테스트 설명',
      location: '대구',
      category: 'C',
      repeat: { type: 'none', interval: 0 },
      notificationTime: 10,
    };

    expect(findOverlappingEvents(newEvent, events)).toEqual([]);
  });
});
