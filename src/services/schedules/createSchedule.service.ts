import AppDataSource from "../../data-source";
import { Property } from "../../entities/properties.entity";
import { Schedule } from "../../entities/schedules.entity";
import { User } from "../../entities/user.entity";
import { AppError } from "../../errors/appError";
import { IScheduleRequest } from '../../interfaces/schedules';

const createScheduleService = async ({ userId, date, hour, propertyId }: IScheduleRequest) => {
  const scheduleRepository = AppDataSource.getRepository(Schedule);
  const propertyRepository = AppDataSource.getRepository(Property);
  const userRepository = AppDataSource.getRepository(User);

  const inputDate = new Date(date);
  const weekday = inputDate.getDay();
  // const year = inputDate.getFullYear();
  // const month = inputDate.getMonth() + 1;
  // const day = inputDate.getDate();

  // const appointmentDate = [year, month, day].join('/');
  const appointmentHour = hour;

  const user = await userRepository.findOneBy({
    id: userId
  });

  if (!user) {
    throw new AppError(400, 'User not found');
  };

  if (!date) {
    throw new AppError(400, 'Date is missing');
  };

  if (weekday === 6 || weekday === 0) {
    throw new AppError(400, 'Invalid day'); 
  };

  if (!hour) {
    throw new AppError(400, 'Hour is missing');
  };

  if (hour < '08:00' || hour > '18:00') {
    throw new AppError(400, 'Hours must be between 8:00 and 18:00');
  };

  if (!propertyId) {
    throw new AppError(404, 'PropertyId is missing');
  };

  const property = await propertyRepository.findOneBy({
    id: propertyId
  });

  if (!property) {
    throw new AppError(404, 'Property not found');
  };

  const bookedDay = await scheduleRepository.findOne({
    where: {
      hour,
      date
    }
  });

  if (bookedDay) {
    throw new AppError(400, 'Date already booked');
  };

  const appointment = new Schedule();
  appointment.date = date;
  appointment.hour = hour;
  appointment.property = property;
  appointment.user = user;

  scheduleRepository.create(appointment);
  scheduleRepository.save(appointment);

  return appointment;
};

export default createScheduleService;