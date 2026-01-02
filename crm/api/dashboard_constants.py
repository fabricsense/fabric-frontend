"""
Sample data constants for custom dashboard.
This file contains all sample data structures for the 8 major dashboard sections.
"""

# 1. Sales Performance Overview
SALES_PERFORMANCE_DATA = {
    "sales_revenue": {
        "current_month": 1250000.00,
        "previous_month": 980000.00,
        "ytd": 14500000.00,
        "growth_mom": 27.55,
        "growth_yoy": 18.50
    },
    "sales_orders": {
        "total": 145,
        "draft": 12,
        "pending_approval": 8,
        "approved": 95,
        "completed": 30,
        "average_order_value": 8620.69
    },
    "sales_invoices": {
        "total": 132,
        "draft": 5,
        "submitted": 45,
        "paid": 70,
        "outstanding": 12,
        "total_outstanding_amount": 185000.00
    }
}

# 2. Customer Metrics
CUSTOMER_METRICS_DATA = {
    "customers": {
        "total": 450,
        "active": 380,
        "inactive": 70,
        "new_this_month": 25,
        "new_last_month": 18
    },
    "leads": {
        "total_pending": 15,
        "converted_this_month": 22,
        "conversion_rate": 68.75,
        "pending_followup": 8
    },
    "top_customers": [
        {"name": "ABC Corporation", "revenue": 125000.00, "orders": 12},
        {"name": "XYZ Enterprises", "revenue": 98000.00, "orders": 8},
        {"name": "DEF Industries", "revenue": 87500.00, "orders": 10},
        {"name": "GHI Solutions", "revenue": 75000.00, "orders": 7},
        {"name": "JKL Group", "revenue": 65000.00, "orders": 6}
    ]
}

# 3. Inventory & Procurement Status
INVENTORY_DATA = {
    "inventory": {
        "low_stock_items": 15,
        "out_of_stock_items": 3,
        "total_stock_value": 2500000.00,
        "stock_by_category": {
            "Main Fabric": 1200000.00,
            "Lining": 450000.00,
            "Tracks & Rods": 350000.00,
            "Accessories": 500000.00
        }
    },
    "material_requests": {
        "total": 45,
        "draft": 5,
        "pending_approval": 8,
        "approved": 20,
        "completed": 12
    },
    "purchase_orders": {
        "total": 28,
        "draft": 3,
        "submitted": 12,
        "received": 13,
        "pending_receipt": 12
    }
}

# 4. Tailoring Operations
TAILORING_OPERATIONS_DATA = {
    "projects": {
        "total_active": 35,
        "completed_this_month": 18,
        "pending_start": 5
    },
    "tailoring_sheets": {
        "total": 42,
        "draft": 8,
        "in_progress": 20,
        "completed": 14
    },
    "job_cards": {
        "not_started": 12,
        "working": 18,
        "completed": 25,
        "average_completion_days": 4.5
    },
    "contractor_payments": {
        "unpaid": 15,
        "partially_paid": 3,
        "paid": 120,
        "total_unpaid_amount": 125000.00,
        "total_paid_this_month": 450000.00
    }
}

# 5. Financial Metrics
FINANCIAL_METRICS_DATA = {
    "revenue": {
        "this_month": 1250000.00,
        "ytd": 14500000.00,
        "target": 15000000.00,
        "achievement_percentage": 96.67
    },
    "receivables": {
        "total_outstanding": 185000.00,
        "overdue": 45000.00,
        "due_this_week": 65000.00,
        "due_this_month": 75000.00
    },
    "payments": {
        "collected_this_month": 1180000.00,
        "collection_rate": 94.40,
        "payment_entries_pending_approval": 8,
        "payment_entries_approved": 45
    },
    "discounts": {
        "this_month": 25000.00,
        "ytd": 185000.00,
        "discount_rate": 2.00,
        "pending_discount_approvals": 3
    },
    "revenue_trend": [
        {"month": "2024-01", "revenue": 1100000.00},
        {"month": "2024-02", "revenue": 1150000.00},
        {"month": "2024-03", "revenue": 1200000.00},
        {"month": "2024-04", "revenue": 1180000.00},
        {"month": "2024-05", "revenue": 1220000.00},
        {"month": "2024-06", "revenue": 1250000.00}
    ]
}

# 6. Pending Approvals & Alerts
PENDING_APPROVALS_DATA = {
    "pending_approvals": {
        "sales_orders": 8,
        "material_requests": 8,
        "payment_entries": 8,
        "discount_approvals": 3,
        "total": 27
    },
    "alerts": {
        "critical": [
            {"type": "Low Stock", "count": 15, "priority": "High"},
            {"type": "Overdue Payment", "count": 5, "priority": "High"},
            {"type": "Delayed Project", "count": 3, "priority": "Medium"}
        ],
        "warnings": [
            {"type": "Pending Material Request", "count": 8},
            {"type": "Unpaid Contractor", "count": 15}
        ]
    }
}

# 7. Measurement Sheets Status
MEASUREMENT_SHEETS_DATA = {
    "measurement_sheets": {
        "total": 65,
        "draft": 12,
        "customer_approval_pending": 8,
        "approved": 40,
        "rejected": 5,
        "conversion_rate": 88.24,
        "average_conversion_days": 2.5
    }
}

# 8. Geographic & Channel Analytics
GEOGRAPHIC_ANALYTICS_DATA = {
    "sales_by_pincode": [
        {"pincode": "560001", "revenue": 125000.00, "orders": 15},
        {"pincode": "560002", "revenue": 98000.00, "orders": 12},
        {"pincode": "560003", "revenue": 87500.00, "orders": 10},
        {"pincode": "560004", "revenue": 75000.00, "orders": 9},
        {"pincode": "560005", "revenue": 65000.00, "orders": 8},
        {"pincode": "560006", "revenue": 55000.00, "orders": 7},
        {"pincode": "560007", "revenue": 45000.00, "orders": 6},
        {"pincode": "560008", "revenue": 40000.00, "orders": 5},
        {"pincode": "560009", "revenue": 35000.00, "orders": 4},
        {"pincode": "560010", "revenue": 30000.00, "orders": 3}
    ],
    "sales_by_channel": {
        "walk_in": {"revenue": 750000.00, "percentage": 60.00},
        "whatsapp": {"revenue": 375000.00, "percentage": 30.00},
        "phone": {"revenue": 125000.00, "percentage": 10.00}
    }
}

