import ticketModel from "../models/ticket.model.js";

export const CreateTicket = async (req, res) => {
  try {
    const { title, description, priority } = req.body;
    const file = req.file;
    const user = req.user.userID;

    if (!title || !description) {
      return res.status(400).json({ message: "Please fill in all fields" });
    }

    const ticket = await ticketModel.create({
      title,
      description,
      priority,
      user,
      file,
    });

    res.status(201).json({
      message: "Ticket created successfully",
      status: true,
      ticket,
    });
  } catch (error) {
    res.status(500).json({
      message: error,
      status: false,
    });
  }
};

export const EditTicket = async (req, res) => {
  try {
    const user = req.user.userID;
    const id = req.params.id;
    const { title, description } = req.body;
    const ticket = await ticketModel.findByIdAndUpdate(
      { _id: id },
      { title, description }
    );

    res.status(201).json({
      massage: "Ticket Updated successfully",
      status: true,
      ticket,
    });
  } catch (error) {
    res.status(500).json({
      message: error,
      status: false,
    });
  }
};

export const DeleteTicket = async (req, res) => {
  try {
    const ticket = await ticketModel.findByIdAndDelete(req.params.id);
    console.log(ticket);
    res.status(200).json({
      message: "Ticket Deleted",
      status: true,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: error,
      status: false,
    });
  }
};

export const FindTicketById = async (req, res) => {
  try {
    const id = req.params.id;
    const ticket = await ticketModel.findById(id);
    if (!ticket) {
      return res.status(404).json({
        message: "Ticket Not Found",
        status: false,
      });
    }
    res.status(201).json({
      message: "Ticket Found",
      status: true,
      ticket,
    });
  } catch (error) {
    res.status(500).json({
      message: error,
      status: false,
    });
  }
};

export const FindTickets = async (req, res) => {
  try {
    const tickets = await ticketModel.find();
    if (!tickets) {
      return res.status(404).json({
        message: "Tickets Not Found",
        status: false,
      });
    }
    res.status(201).json({
      message: "Tickets Found",
      status: true,
      tickets,
    });
  } catch (error) {
    res.status(500).json({
      message: error,
      status: false,
    });
  }
};
