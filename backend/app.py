from flask import Flask, jsonify, request
from flask_cors import CORS
from db import get_connection

app = Flask(__name__)
CORS(app)

# ✅ Home route
@app.route('/')
def home():
    return "API is running successfully 🚀"


# ✅ API with Search + Filter + Pagination
@app.route('/api/data', methods=['GET'])
def get_data():
    try:
        search = request.args.get('search', '')
        category = request.args.get('category', '')
        min_amount = request.args.get('minAmount', '')

        # ✅ Pagination params
        page = int(request.args.get('page', 1))
        per_page = int(request.args.get('per_page', 5))

        offset = (page - 1) * per_page

        conn = get_connection()
        cursor = conn.cursor()

        # 🔍 Base query
        query = "SELECT * FROM sales WHERE 1=1"
        params = []

        # 🔍 Search
        if search:
            query += " AND name LIKE ?"
            params.append(f"%{search}%")

        # 🎯 Category filter
        if category:
            query += " AND category = ?"
            params.append(category)

        # 💰 Amount filter
        if min_amount:
            query += " AND amount >= ?"
            params.append(min_amount)

        # ✅ Get total count (for frontend pagination)
        count_query = f"SELECT COUNT(*) FROM ({query})"
        cursor.execute(count_query, params)
        total_records = cursor.fetchone()[0]

        # ✅ Add pagination
        query += " LIMIT ? OFFSET ?"
        params.extend([per_page, offset])

        cursor.execute(query, params)
        rows = cursor.fetchall()

        data = [dict(row) for row in rows]

        conn.close()

        return jsonify({
            "data": data,
            "total": total_records,
            "page": page,
            "per_page": per_page
        })

    except Exception as e:
        return jsonify({"error": str(e)}), 500


# ✅ Run server
if __name__ == '__main__':
    app.run(debug=True)