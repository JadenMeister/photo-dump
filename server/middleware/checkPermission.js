const db = require('../config/database');

module.exports = function (action) {
    return (req, res, next) => {
        const userId = req.user.id; // 유저 정보 조회

        const sql = `
      SELECT p.action FROM permissions p
      JOIN role_permissions rp ON p.id = rp.permission_id
      JOIN users u ON u.role_id = rp.role_id
      WHERE u.id = ?
    `;

        db.query(sql, [userId], (err, rows) => {
            if (err) return res.status(500).json({ error: 'DB 오류' });

            const allowed = rows.some(row => row.action === action);
            if (!allowed) return res.status(403).json({ error: '권한 없음' });

            // 통과 ( 권한 체크 통과하면 다음 진행)
            next();
        });
    };
};