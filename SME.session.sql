          SELECT 
              b.business_id,
              b.business_name,
              b.address,
              br.barangay_name,
              sa.subarea_name,
              b.latitude,
              b.longitude,
              st.smetype_name AS sme_type,
              c.category_name,
              sc.subcategory_name
          FROM Business b
          LEFT JOIN Barangay br ON b.barangay_id = br.barangay_id
          LEFT JOIN Subarea sa ON b.subarea_id = sa.subarea_id
          LEFT JOIN smeType st ON b.smeType_id = st.smeType_id
          LEFT JOIN Category c ON b.category_id = c.category_id
          LEFT JOIN Subcategory sc ON b.subcategory_id = sc.subcategory_id
          WHERE status = 'Active'
          ORDER BY b.business_id ASC;