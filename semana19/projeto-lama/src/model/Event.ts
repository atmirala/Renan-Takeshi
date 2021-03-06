export class Event {
  constructor(
    private id: string,
    private weekDay: string,
    private startTime: number,
    private endTime: number,
    private bandId: string
  ) {}

  getId() {
    return this.id;
  }

  setId(id: string) {
    this.id = id;
  }

  static toEventModel(event: any): Event {
    return new Event(
      event.id,
      event.week_day,
      event.start_time,
      event.end_time,
      event.band_id
    );
  }
}

export enum WEEKDAY {
  FRIDAY = "FRIDAY",
  SATURDAY = "SATURDAY",
  SUNDAY = "SUNDAY",
}

export interface EventInputDTO {
  weekDay: string;
  startTime: number;
  endTime: number;
  bandId: string;
}

export interface EventAndBandDTO {
  id: string;
  weekDay: string;
  startTime: number;
  endTime: number;
  name: string;
  musicGenre: string;
}
