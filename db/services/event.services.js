const { Event } = require("../models/index");

//Create Event
const createEvent = async (event) => {
  await Event.create({
    start: event.start,
    end: event.end,
    status: event.status,
    title: event.title,
    durationType: event.durationType,
    color: event.color,
    backgroundColor: event.backgroundColor,
    comment: event.comment,
  });
};

module.exports = {
  createEvent,
};
