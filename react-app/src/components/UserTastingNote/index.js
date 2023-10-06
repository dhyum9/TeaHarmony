const UserTastingNote = ({tastingNote}) => {
  const {
    note,
    score,
    flavors,
    user,
    tea
  } = tastingNote;

  return (
    <div>
      <div>
        USER: {user}
      </div>
      <div>
        SCORE: {score}
      </div>
      <div>
        NOTE: {note}
      </div>
    </div>
  );
}

export default UserTastingNote;
