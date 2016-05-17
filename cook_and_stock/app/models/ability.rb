class Ability
  include CanCan::Ability

  def initialize(user)
    # Define abilities for the passed in user here
    user ||= User.new # guest user (not logged in)
    if user.has_role?(:admin)
      can :manage, :all
    end
    if user.has_role?(:client)
      can :read, Dish
    end
    if user.has_role?(:manager)
      can :read, Dish
    else
      #user.roles << Role.find_by(name: 'Client')
    end
  end
end
