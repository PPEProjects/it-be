import { parse } from "path/posix"

export default{
    User:{
        email:(parent) => parent.email,
        id:(parent) => parent.id,
        name:(parent) => parent.name,
        roles:(parent) => (typeof parent.roles === 'string') ? JSON.parse(parent.roles) : parent.roles,
        first_name:(parent) => parent.first_name,
        phone_number:(parent) => parent.phone_number,
        username:(parent) => parent.username,
        role_label:(parent) => parent.role_label,
        is_flag:(parent) => parent.is_flag,
        quotes:(parent) => parent.quotes,
        avatar_attachment_id:(parent)=> (typeof parent.avatar_attachment_id === 'string') 
        ? JSON.parse(parent.avatar_attachment_id) 
        : parent.avatar_attachment_id,
        background_attachment_id :(parent) => (typeof parent.background_attachment_id === 'string') 
        ? JSON.parse(parent.background_attachment_id) 
        : parent.background_attachment_id,
        avatar_attachment :(parent) => (typeof parent.avatar_attachment === 'string') 
        ? JSON.parse(parent.avatar_attachment) 
        : parent.avatar_attachment,
        background_attachment :(parent) => (typeof parent.roles === 'string') 
        ? JSON.parse(parent.background_attachment)
        : parent.background_attachment,
        address:(parent) => parent.address,
        country :(parent) => parent.country,
        gender :(parent) => parent.gender,
        date_of_birth :(parent) => parent.date_of_birth,
        createdAt: (parent) => parent.created_at,
        updatedAt: (parent) => parent.updated_at,
        
      },
}
