import React, { useState } from 'react';
import { Trophy, Award, Search, Filter } from 'lucide-react';
import './LeaderboardPage.css';

const LeaderboardPage = () => {
  const [filter, setFilter] = useState('All');

  const leaders = [
    { rank: 1, name: 'Sarah Chen', college: 'Stanford', score: 985, skills: ['AI', 'Python'] },
    { rank: 2, name: 'Michael Ross', college: 'MIT', score: 942, skills: ['React', 'Node'] },
    { rank: 3, name: 'Elena Gilbert', college: 'Oxford', score: 890, skills: ['UI/UX', 'Figma'] },
    { rank: 4, name: 'David Miller', college: 'Harvard', score: 875, skills: ['Blockchain', 'Go'] },
    { rank: 5, name: 'Anita Roy', college: 'IIT Bombay', score: 860, skills: ['C++', 'Rust'] },
  ];

  return (
    <div className="leaderboard-container">
      <header className="content-header">
        <div>
          <h1>Skill Leaderboard</h1>
          <p>Top talented students across the platform global network.</p>
        </div>
        <div className="filter-group">
          <button 
            className={`filter-btn ${filter === 'All' ? 'active' : ''}`}
            onClick={() => setFilter('All')}
          >
            All Colleges
          </button>
          <button 
            className={`filter-btn ${filter === 'Mine' ? 'active' : ''}`}
            onClick={() => setFilter('Mine')}
          >
            My College
          </button>
        </div>
      </header>

      <div className="leader-main-grid">
        <div className="podium-section">
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="podium-card silver glimmer-hover"
          >
            <span className="rank-num">2</span>
            <div className="avatar-lg">MR</div>
            <h4>Michael Ross</h4>
            <p>942 pts</p>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, y: 70 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="podium-card gold glimmer-hover"
          >
            <Trophy className="crown" size={32} />
            <div className="avatar-xl">SC</div>
            <h4>Sarah Chen</h4>
            <p>985 pts</p>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="podium-card bronze glimmer-hover"
          >
            <span className="rank-num">3</span>
            <div className="avatar-lg">EG</div>
            <h4>Elena Gilbert</h4>
            <p>890 pts</p>
          </motion.div>
        </div>

        <div className="leader-table-card">
          <table className="leader-table">
            <thead>
              <tr>
                <th>Rank</th>
                <th>Student</th>
                <th>College</th>
                <th>Top Skills</th>
                <th>Skill Score</th>
              </tr>
            </thead>
            <tbody>
              {leaders.map((student, i) => (
                <motion.tr 
                  key={student.rank}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.6 + i * 0.1 }}
                >
                  <td>
                    <span className={`rank-badge ${student.rank <= 3 ? 'top' : ''}`}>
                      {student.rank}
                    </span>
                  </td>
                  <td>
                    <div className="td-student">
                      <div className="avatar-xs">{student.name.split(' ').map(n=>n[0]).join('')}</div>
                      <strong>{student.name}</strong>
                    </div>
                  </td>
                  <td>{student.college}</td>
                  <td>
                    <div className="td-skills">
                      {student.skills.map(s => <span key={s} className="tag-sm">{s}</span>)}
                    </div>
                  </td>
                  <td>
                    <div className="td-score">
                      <Award size={16} color="var(--accent-color)" />
                      <span>{student.score}</span>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default LeaderboardPage;
