const { createClient } = require('@supabase/supabase-js');

const API_KEY = process.env.API_KEY
const PROJECT_ID = process.env.PROJECT_ID

const supabase = createClient(API_KEY, PROJECT_ID);

module.exports = supabase
