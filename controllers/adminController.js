const Assignment = require('../models/assignment');

exports.getAssignments = async (req, res) => {
  try {
    const assignments = await Assignment.find({ admin: req.user.id }).populate('userId', 'name').sort('-createdAt');
    res.json(assignments);
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
};

exports.acceptAssignment = async (req, res) => {
  try {
    const assignment = await Assignment.findById(req.params.id);
    if (!assignment) return res.status(404).json({ msg: 'Assignment not found' });

    assignment.status = 'accepted';
    await assignment.save();
    res.json({ msg: 'Assignment accepted' });
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
};

exports.rejectAssignment = async (req, res) => {
  try {
    const assignment = await Assignment.findById(req.params.id);
    if (!assignment) return res.status(404).json({ msg: 'Assignment not found' });

    assignment.status = 'rejected';
    await assignment.save();
    res.json({ msg: 'Assignment rejected' });
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
};
