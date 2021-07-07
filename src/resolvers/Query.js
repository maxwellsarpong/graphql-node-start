// filtering the feed schema to match a pattern
function feed(parent, args, context, info) {
    const where = args.filter?{
        OR:[
            {description: {contains: args.filter}},
            {url: {contains: args.filter}}
        ]
    }
    :{}
    
    const links = context.prisma.link.findMany({
        where,
        skip: args.skip,
        take: args.take,
        orderBy: args.orderBy
    })

    const count = context.prisma.link.count({where})

    return {links, count}
  }

  //filtering the person schema to match a pattern
function person(parent, args, context, info) {
    const where = args.filter?{
        OR:
            [
                {name: {contains: args.filter}},
                {email: {contains: args.filter}} 
            ]
    }
    :{}

    const links =  context.prisma.user.findMany({
        where,
        skip: args.skip,
        take: args.take
    })
    return links
  }
  
  
  module.exports = {
    feed,
    person,
  }